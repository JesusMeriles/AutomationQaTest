Feature: Inicio de Sesión 

@qa @login
  Scenario: Inicio de sesion con credenciales validas
    Given El usuario se encuentra en la pantalla de inicio de sesión
    When intenta ingresar con el usuario "standard_user" y la contraseña "secret_sauce"
    Then debería ver la pantalla principal de productos
    And debería ver el icono del carrito de compras
    And debería ver al menos un producto en la lista

@qa @login
  Scenario: Login fallido: <caso> con usuario "<usuario>"
    Given El usuario se encuentra en la pantalla de inicio de sesión
    When intenta ingresar con el usuario "<usuario>" y la contraseña "<contraseña>"
    Then debería ver el mensaje de error "<mensaje>"
    And debería ver el widget de error

    
    Examples:
      | caso                   | usuario          | contraseña      | mensaje                                               |
      | Usuario bloqueado      | locked_out_user  | secret_sauce    | Sorry, this user has been locked out.                 |
      | Credenciales inválidas | problem_user     | secret_sauces    | Username and password do not match any user in this service. |  