import AuthLayoutSplitTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthAdminLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <AuthLayoutSplitTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutSplitTemplate>
    );
}
