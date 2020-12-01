# mercadopago
Métodos básicos (crear preference, consulta  de pago y devolver dinero)con el SDK de mercadopago y Node.js  

## Comenzando 🚀

_Primero debes obtener las credenciales de mercadopago y copie el access_token en la sección de credenciales https://www.mercadopago.com.ar/developers/es/guides/resources/faqs/credentials/_

_Una vez que tenemos las credenciales las agregamos en el archivo de configuracion config.js, junto a otros datos._

```
exports.TOKENMERCADOPAGO = //access_token
exports.EMAIL = /* Un email de prueba */
exports.EXTERNAL_REFERENCE = /* External reference de prueba */
exports.NOTIFICACION = /* URL donde se envia la notificacion */
```

### Instalación 🔧

_Crear la imagen de docker con_

```
docker build -t mercadopago . 
```

_Una vez generado el contenedor, ejecutarlo_

```
docker run -p 3000:3000 idContenedor
```

_Puede probar desde postman en los siguientes endpoint_

```
post -> http://localhost:3000/crearpreferencia
get -> http://localhost:3000/estadopago/:external
put -> http://localhost:3000/devolverpago/:idpago
```
