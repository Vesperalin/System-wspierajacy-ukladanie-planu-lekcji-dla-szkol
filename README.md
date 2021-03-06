# Application supporting creating schedules in primary schools

Application supports schedules creating for classes in primary schools. It prevents from: putting different classes in the same classroom at the same time, assigning two lessons to one teacher at the same time and assigning two lessons to one class at the same time. App enables to: create, edit, delete and show plans for classes. It also has Google authentication, that mimics behavior of SSO in organizations (only authorized people can create, edit and delete plans).

## Table of Contents

* [Features](#features)
* [Technologies](#technologies)
* [Preview](#preview)
* [Authors](#authors)
* [Additional Information](#additional-information)

## Features

* CRUD operations for schedules at school
    * create, edit and delete only for authorized users
    * prevents from putting different classes in the same classroom
    * prevents from assigning two classes to one teacher at the same time
    * prevents from assigning two classes to one class at the same time
    * when creating plan, it provides starting lessons for given class based on its core curriculum
* CRUD operations for teachers at school
    * create, edit and delete only for authorized users
* CRUD operations for subjects at school
    * create, edit and delete only for authorized users
* CRUD operations for classrooms at school
    * create, edit and delete only for authorized users
* CRUD operations for classes at school
    * create, edit and delete only for authorized users
* setting classes hours - django admin panel
* setting core curriculum - django admin panel

## Technologies

<div>
  <div style="display: flex; align-items: center;">
    <img style="display: inline-block; margin-right: 10px" src="./repo-assets/react.png" alt="Employee data" title="React">
   React
  </div>
  <div style="display: flex; align-items: center;">
    <img style="display: inline-block; margin-right: 10px" src="./repo-assets/django.png" alt="Employee data" title="Django">
   Django
  </div>
  <div style="display: flex; align-items: center;">
    <img style="display: inline-block; margin-right: 10px" src="./repo-assets/mysql.png" alt="Employee data" title="MySQL">
   MySQL
  </div>
  <div style="display: flex; align-items: center;">
    <img style="display: inline-block; margin-right: 10px" src="./repo-assets/docker.png" alt="Employee data" title="Docker">
   Docker
  </div>
</div>

## Preview
![web app preview](./repo-assets/main-page.png)
![schedule preview](./repo-assets/schedule-preview.png)
![schedule planning](./repo-assets/schedule-planning.png)
![schedule verifaction](./repo-assets/schedule-verification.png)

## Authors

[Klaudia B??a??yczek](https://github.com/Vesperalin)<br />
[Monika Gali??ska](https://github.com/LeviSforza)<br />
[Justyna Ma??uszy??ska](https://github.com/justyna-maluszynska)

## Additional Information

The app was created during Advanced Web Technologies course during 6th semester of Applied Computer Science BSc studies.
