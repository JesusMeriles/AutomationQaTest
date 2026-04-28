Feature: Filtrar productos

@qa @products @filter
Scenario: Filtrar productos con menor precio -> Validar menor precio. 
    Given El usuario se encuentra en la pantalla principal de productos
    When Aplica el filtro de precio de menor a mayor
    Then Debería ver que la lista de productos no está vacía
    And Deberia ver los productos ordenados por precio de menor a mayor 
    And El primer producto debería ser "Sauce Labs Onesie"
