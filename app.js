const express = require('express')
const app = express ()
const mercadopago = require("mercadopago");
const {TOKENMERCADOPAGO, EMAIL, EXTERNAL_REFERENCE, NOTIFICACION} = require('./config')

/**
* !configuramos con el access_token que nos provee mercadopago 
**/
mercadopago.configure({
	access_token: TOKENMERCADOPAGO
});

/** 
* ! Como crear una preferencia(datos básicos).
* * Items: se define lo que se va pagar, tipo de moneda, monto, etc.
* * Payer: el email de quién realiza el pago.
* * payment_methods: métodos de pagos, queda exlcuido (ticket y atm) con excluded_payment_types.
* * notificacion_url: la url a la cual mercadopago te notificará de la situación del pago, este caso se utiliza IPN.
* * external_reference: es una variable a la cual identifica al pago.
**/
app.post('/crearpreferencia', (req, res,next) => {

	var preference = {
		items: [
			{
				title: 'Creando una preferencia',
				quantity: 1,
				currency_id: 'ARS',
				unit_price: 10
			}
		],
		payer:
		{
			email: EMAIL
		},
		payment_methods: {
			excluded_payment_types:[
				{id:'ticket'},
				{id:'atm'}
			]
		},
		notification_url: NOTIFICACION,
		external_reference: EXTERNAL_REFERENCE
	}
	
	/**
	 * Creamos la preference.
	 * @return la preferencia creada, si se creo correctamente.
	 * @return el mensaje de error si no se pudo crear la preference.
	 **/
	mercadopago.preferences.create(preference)
	.then( (prefe)  => {
		res.status(200).send({preferenceid: prefe})
	}).catch((error)=> {
		res.status(500).send({error: error})
	});
})

/** 
** Consultar el estado de un pago.
** @params external_reference, con este parámetro se consultará el estado del pago.
** @return devolverá si el pago fue realizado o no. 
**/
app.get('/estadopago/:external', (req, res, next) => {
	
	/**
	** Agregamos un filtro para la busqueda, este caso, external_reference que es pasado como parametro.
	**/
	var filters = {
    external_reference: req.params.external
  }

	/**
	** Llamamos al metodo payment.search que es el encargado para buscar el pago
	**/
  mercadopago.payment.search({
    qs: filters
	})
	.then((estadoPago) => {
		res.status(200).send({pago: estadoPago})
	})
	.catch((error) =>{
		res.status(500).send({ error: error})
	})
})

/** 
** Devolver un pago con el idPago
** La devolución del pago se realiza con el id de pago, que se lo puede obtener con la búsqueda del pago.
** @params idPago
**/
app.put('/devolverpago/:idpago', (req,res,next) => {
	mercadopago.payment.refund(req.params.idpago)
	.then((pagoDevuelto) => {
		res.status(200).send({ mensaje: 'El pago se devolvio correctamente'})
	})
	.catch((error) => {
		res.status(500).send({ error: error})
	})
})

app.listen(3000, () => {
    console.log('Server ejecutandose en el puerto 3000')
})