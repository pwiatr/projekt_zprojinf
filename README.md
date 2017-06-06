<<<<<<< HEAD
# krakowskiTarg
KrakowskiTarg to aplikacja umożliwiająca dzieleni się usługami na terenie Krakowa. Użytkownik może przeglądać oferty i kontaktować się z osobą, która ofertę wystawiła, by otrzymać wykonanie danej usługi. Każdy użytkownik może się zarejestrować i dodawać własne oferty.

# Drzewo katalogów

- gulp (moduły gulp odowiadające za budowanie/podbijanie wersji/obsługę CSS/JS/wstrzykiwanie zależności do index.html)
- src
    - main
        - docker (miejsce na dodatkowy moduł dockera, który można wygenerować przy pomocy jHipster)
        - java (główne klasy aplikacji)
            - com.targ.krakowski
                - aop.logging (klasy logowania)
                - config (klasy konfigurujące aplikacje)
                - controllers (kontrolery widoku)
                - domain (reprezentacje encji bazodanowych)
                - repository (repozytoria JPA Spring Data)
                - security (ochrona)
                - service (specjalne serwisy)
                - web.rest (obsługa REST api)
        - resources (zasoby dodatkowe - języki/dane konfiguracyjne/szablony)
            - config (pliki konfiguracyjne bazy oraz aplikacji)
            - i18n (lokalizacje)
            - mails (szablony maili)
            - templates (dodatkowe szablony)
        - webapp (frontend aplikacji - AngularJS)
            - app (pliki angularJS)
            - content (pliki CSS/zdjęcia/czcionki)
            - i18n (lokalizacja Frontend)
            - scss (pliki SASS)
            - swagger-ui (pliki dokumentacji API)
    - test (wszystkie testy - Java i AngularJS)
        - java (test klas Javy)
        - javascript (testy e2e i jednostkowe AngularJS)
        
# Zaimplementowany wzorzec
Zaimplementowany został wzorzec dekoratora w plikach:
- price.decorator.js
- offer.controller.js

Pozwala on na modyfikację cen ofert w trakcie działania programu za pomocą prostego mechanizmu (bez użycia podklasowania czy dziedziczenia).
Zaimplementowano prosty wzorzec dekoratora, którym ceny są "dekorowane" zniżkami przy zachowaniu tej samej metody dostępowej (getPrice) i bez konieczności tworzenia/używania dodatkowych klas.
