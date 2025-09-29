<?php

namespace App\Events;

use App\Models\NotificationInstance;
use App\Http\Resources\NotificationInstanceResource;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;
    public $userId;

    /**
     * Create a new event instance.
     */
    public function __construct(NotificationInstance $notification, $userId = null)
    {
        $this->notification = $notification;
        $this->userId = $userId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Si la notification a un recipient_id spécifique, diffuser sur son canal privé
        if ($this->notification->recipient_id) {
            return [
                new PrivateChannel('notifications.' . $this->notification->recipient_id),
            ];
        }

        // Sinon, diffuser sur un canal général pour tous les utilisateurs connectés
        return [
            new Channel('notifications.general'),
        ];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'notification' => new NotificationInstanceResource($this->notification),
            'unread_count' => $this->getUnreadCount(),
        ];
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'notification.created';
    }

    /**
     * Get unread notification count for the user
     */
    private function getUnreadCount(): int
    {
        if ($this->notification->recipient_id) {
            return \App\Repositories\NotificationInstanceRepository::query()
                ->where('recipient_id', $this->notification->recipient_id)
                ->where('is_read', false)
                ->count();
        }

        return \App\Repositories\NotificationInstanceRepository::unreadCount();
    }
}
