
# Django Commands

W folderze migrations zawsze musi istnieć plik _init_.py, jego nie ruszamy. Po ściągnięciu aktualnej wersji z gita najlepiej usunąć migracje numerowane np. 0001_... . 




## Komendy

Wszystkie komendy rozpoczynamy w terminalu "python manage.py ..."

```bash
  python manage.py makemigrations timetable
  python manage.py sqlmigrate timetable 0001 (odpowiedni numer kolejnych migracji)
  python manage.py migrate
  python manage.py createsuperuser
  python manage.py runserver
```
createsuperuser - służy do stworzenia konta admina, wykonywane tylko po pierwszej migracji
makemigrations, sqlmigrate i migrate - wykonywane po zmianach w modelach
runserver - służy do włączenia serwera, nie ma potrzeby wyłączania i włączania po każdej zmianie, wystarczy zapisanie zmian ctrl + S
    