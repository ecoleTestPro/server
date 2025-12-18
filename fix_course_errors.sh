#!/bin/bash

# courseCard.tsx - nombreuses variables non utilisées
file="resources/js/components/courses/card/courseCard.tsx"
if [ -f "$file" ]; then
  # Corriger les types any
  sed -i 's/response: any/response: unknown/g' "$file"
  sed -i 's/error: any/error: unknown/g' "$file"
  
  # Commenter les variables non utilisées
  sed -i 's/const handleTogglePublish =/\/\/ const handleTogglePublish =/g' "$file"
  sed -i 's/const CourseHeader =/\/\/ const CourseHeader =/g' "$file"
  sed -i 's/const CourseTitle =/\/\/ const CourseTitle =/g' "$file"
  sed -i 's/const CourseDescription =/\/\/ const CourseDescription =/g' "$file"
  sed -i 's/const CourseDuration =/\/\/ const CourseDuration =/g' "$file"
  sed -i 's/const CourseFooter =/\/\/ const CourseFooter =/g' "$file"
  sed -i 's/const CourseAttachment =/\/\/ const CourseAttachment =/g' "$file"
  sed -i 's/const CourseStatus =/\/\/ const CourseStatus =/g' "$file"
  
  # Corriger les expressions non utilisées
  sed -i 's/course\.price &&/\/\* course.price \&\&/g' "$file"
  sed -i 's/course\.regular_price &&/course.regular_price \&\& \*\//g' "$file"
fi

# courseCardWrapper.tsx
file="resources/js/components/courses/card/courseCardWrapper.tsx"
if [ -f "$file" ]; then
  sed -i 's/const indexOfFirstCourse =/\/\/ const indexOfFirstCourse =/g' "$file"
  sed -i 's/(response) => {/() => {/g' "$file"
fi

# courseList.tsx
file="resources/js/components/courses/card/courseList.tsx"
if [ -f "$file" ]; then
  sed -i 's/const { t, i18n }/const { t }/g' "$file"
fi

# categoryForm.tsx
file="resources/js/components/courses/categories/categoryForm.tsx"
if [ -f "$file" ]; then
  sed -i 's/const ReactQuill =/\/\/ const ReactQuill =/g' "$file"
  sed -i 's/const { catData }/\/\/ const { catData }/g' "$file"
  sed -i 's/const { data, setData, post, processing/const { data, setData, processing/g' "$file"
  sed -i 's/routeUrl: any/routeUrl: string/g' "$file"
fi

echo "Course components errors fixed"
