Feature: Compra de productos

@qa @purchase @checkout
Scenario: Realizar una comprar desde carrito (producto con menor precio) -> Validar compra exitosa.  
    Given El usuario se encuentra en la pantalla principal de productos
    And Aplica el filtro de precio de menor a mayor
    When Agrega el primer producto al carrito
    And Completa el proceso de compra
    Then Debería ver la pantalla de compra completada exitosamente
    And El mensaje de confirmación debería ser el esperado
    And La imagen del Pony Express debería estar presente 
