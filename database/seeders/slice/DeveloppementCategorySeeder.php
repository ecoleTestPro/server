<?php

namespace Database\Seeders\slice;


class DeveloppementCategorySeeder extends AbstractCourseCategorySeeder
{
    public function __construct($category = null)
    {
        $this->category = $category;

        $this->courses = [

            $this->buildCourse([
                'title' => 'Algorithmie',
                'slug'  => 'algorithmie',
                'level' => 'DEV',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'Programmation avec Python',
                'slug'  => 'programmation-avec-python',
                'level' => 'DEV',
                'duration' => 5,
            ]),
            $this->buildCourse([
                'title' => 'Programmation avec Java',
                'slug'  => 'programmation-avec-java',
                'level' => 'DEV',
                'duration' => 5,
            ]),
            $this->buildCourse([
                'title' => 'Administration des bases de données SQL',
                'slug'  => 'administration-des-bases-de-donnees-sql',
                'level' => 'DEV',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'CI/CD avec GitHub, GitLab, Bitbucket, Jenkins',
                'slug'  => 'ci-cd-avec-github-gitlab-bitbucket-jenkins',
                'level' => 'DEV',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'BPM et développement low-code',
                'slug'  => 'bpm-et-developpement-low-code',
                'level' => 'DEV',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'RPA – Robotic Process Automation',
                'slug'  => 'rpa-robotic-process-automation',
                'level' => 'DEV',
                'duration' => 3,
            ]),
        ];
    }
}
