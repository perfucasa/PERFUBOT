const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')


const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
//const MockAdapter = require('@bot-whatsapp/database/mock')
const MongoAdapter = require('@bot-whatsapp/database/mongo')
require('dotenv').config()

const menu = [
        'Dependiendo el motivo de su consulta, escriba el número según la opción deseada 😄',
        '👉 1. *Preguntas* para mostrar las preguntas más frecuentes de nuestros clientes',
        '👉 2. *Precios*  para consultar el valor de nuestros productos',
        '👉 3. *Contactar* para contactarte directamente con uno de nuestros asesores',
        '👉 4. *Redes* para ver nuestras redes',
        '👉 5. *Direccion* para ver la dirección de nuestro local y nuestros horarios de apertura/cierre',
        '👉 6. *Reclamos* para reclamar un fallo en un producto o un faltante en su paquete',
        '',
        '',
        '👉 0. *Salir* para salir de este menú',
    ]


const menuReclamos = [
        '¿A qué se debe tu reclamo? 😥',
        '👉 1. Una falla en el producto',
        '👉 2. Un faltante en el paquete',
        '👉 3. Recibí un producto distinto al que compré',
        '👉 4. Me arrepentí de mi compra',
        '',
        '👉 0. Volver al menú principal',
    
    ]

const flowReclamos = addKeyword(EVENTS.ACTION)
    .addAnswer(menuReclamos,
    { capture: true },  async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", ,"4", "0", "Salir"].includes(ctx.body)) {
            return fallBack(
            "Respuesta no válida, por favor selecciona una de las opciones."
            );
        }
        switch(ctx.body){
            case "1":
                return await flowDynamic([
                    'Si tu producto tiene una falla necesitaría los siguientes datos: ',
                    '- Una explicación del inconveniente',
                    '- Un video del inconveniente',
                    '- Si lo compraste por MercadoLibre o por nuestra página web necesitaría tu nombre de usuario',
                    '- La fecha en la que compraste el producto',
                    'Una vez tengamos todos estos datos deberás esperar a que un asesor te contacte para ver como seguir el caso 😁',
                    '',
                    'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                ],{
                    delay: 4000,
                });
            case "2":
                return await flowDynamic([
                    'Si recibiste tu paquete con menos productos de los que compraste necesitaría los siguientes datos: ',
                    '- Si compraste por MercadoLibre o por nuestra página web necesitaría tu nombre de usuario',
                    '- Una foto de todos los productos que te llegaron',
                    '- La fecha en la que compraste',
                    '- Un alias/cvu/cbu',
                    'Una vez tengamos todos estos datos deberás esperar a que un asesor te contacte para ver como seguir el caso 😁',
                    '',
                    'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                ],{
                    delay: 4000,
                });
            case "3": 
                return await flowDynamic([
                    'Si recibiste un producto distinto al que compraste necesitaría los siguientes datos: ',
                    '- Si compraste por MercadoLibre o por nuestra página web necesitaría tu nombre de usuario',
                    '- Una foto de el o los productos que te llegaron',
                    '- La fecha en la que compraste',
                    '- Un alias/cvu/cbu',
                    '- El domicilio con el que realizaste la compra',
                    'Una vez tengamos todos estos datos deberás esperar a que un asesor te contacte para ver como seguir el caso 😁',
                    '',
                    'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                ],{
                    delay: 4000,
                });
            case "4": 
                return await flowDynamic([
                    'Si te arrepentiste de la compra y querés devolver el producto, recordá que: ',
                    '- Nuestra garantía es de un mes',
                    '- Si el producto es de uso personal no tiene devolución salvo que el mismo nunca haya sido abierto/usado',
                    '- Si compraste por MercadoLibre tenés que hacer el reclamo por ese medio',
                    '- El envío corre por cuenta del comprador',
                    '',
                    'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                ],{
                    delay: 4000,
                });
            case "0":
                return gotoFlow(menuFlow);
            case "Salir":
                return gotoFlow(menuFlow);
        }
    })



const menuCategorias = [
        '¿Qué estas buscando? 🤔',
        '👉 1. Manicura',
        '👉 2. Cuidado Personal & Belleza',
        '👉 3. Aromatización',
        '👉 4. Electrónica',
        '👉 5. Iluminación',
        '👉 6. Hogar',
        '👉 7. Regalería',
        '',
        '👉 0. Volver al menú principal'
    ]



const flowPrecios = addKeyword(EVENTS.ACTION)
    .addAnswer(menuCategorias,
        { capture: true },  async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
            
            if (!["1", "2", "3", ,"4", "5", "6", "7", "0", "Salir"].includes(ctx.body)) {
                return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
                );
            }
            
            
                switch(ctx.body){
                    case "1":
                        return await flowDynamic([
                            'Te dejo todos nuestros productos disponibles de la categoría *MANICURA*: ',
                            'https://www.perfucasa.com/unas/',
                            '',
                            'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                        ],{
                            delay: 3000,
                        });
                    case "2":
                        return await flowDynamic([
                            'Te dejo todos nuestros productos disponibles de la categoría *CUIDADO PERSONAL & BELLEZA*: ',
                            'https://www.perfucasa.com/belleza/',
                            '',
                            'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                        ],{
                            delay: 3000,
                        });
                    case "3": 
                        return await flowDynamic([
                            'Te dejo todos nuestros productos disponibles de la categoría *AROMATIZACIÓN*: ',
                            'https://www.perfucasa.com/aromatizacion/',
                            '',
                            'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                        ],{
                            delay: 3000,
                        });
                    case "4": 
                        return await flowDynamic([
                            'Te dejo todos nuestros productos disponibles de la categoría *ELECTRÓNICA*: ',
                            'https://www.perfucasa.com/electronica/',
                            '',
                            'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                        ],{
                            delay: 3000,
                        });
                    case "5": 
                        return await flowDynamic([
                            'Te dejo todos nuestros productos disponibles de la categoría *ILUMINACIÓN*: ',
                            'https://www.perfucasa.com/iluminacion/',
                            '',
                            'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                        ],{
                            delay: 3000,
                        });
                    case "6": 
                        return await flowDynamic([
                            'Te dejo todos nuestros productos disponibles de la categoría *HOGAR*: ',
                            'https://www.perfucasa.com/hogar/',
                            '',
                            'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                        ],{
                            delay: 3000,
                        });
                    case "7": 
                        return await flowDynamic([
                            'Te dejo todos nuestros productos disponibles de la categoría *REGALERÍA*: ',
                            'https://www.perfucasa.com/regaleria/',
                            '',
                            'Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!'
                        ],{
                            delay: 3000,
                        });
                    case "0":
                        return gotoFlow(menuFlow);
                    case "Salir":
                        return gotoFlow(menuFlow);
                }
            
           
        
        })

const flowContactar = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '*HORARIOS DE ATENCIÓN* de 11 a 19hs 🙏',
        'Si necesitas comunicarte con uno de nuestros asesores podes llamar a cualquiera de los siguientes números:',
        '+54 9 11 3170-2270 o +54 9 11 2670-2222'
    ],{
        delay: 4000,
    })
    .addAnswer('Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!',{
        delay: 2000,
    })

const flowRedes = addKeyword(EVENTS.ACTION)
    .addAnswer([
        'Te dejo por acá nuestras redes y métodos de contacto 😎',
        '*Mail*: perfucasa@ventas.com',
        '*Instagram*: https://instagram.com/perfucasa',
        '*Facebook*: https://www.facebook.com/perfucasa',
        '*Youtube*: https://youtube.com/perfucasa',
        '*TikTok*: https://www.tiktok.com/@perfucasalocal',
        '*Whatsapp*: +54 9 11 3170-2270 o +54 9 11 2670-2222'
    ],{
        delay: 4000,
    })
    .addAnswer('Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!',{
        delay: 2000,
    })

const flowDireccion = addKeyword(EVENTS.ACTION)
    .addAnswer('📍 Estamos en Av. Cabildo 2431, Belgrano, CABA. De lunes a sábados de 11 a 19hs.',{
        delay: 2000,
    })
    .addAnswer('Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!',{
        delay: 2000,
    })

const flowPreguntas = addKeyword(EVENTS.ACTION)
    .addAnswer([
        '👀 Acá te dejo algunas de las preguntas más frecuentes que nos realizan:',
        '',
        '*¿Es seguro comprar en su tienda online?*',
        '¡Sí! En nuestra tienda online contamos con medidas de seguridad altamente efectivas para proteger tus datos personales y bancarios. Además, utilizamos sistemas de encriptación para garantizar la seguridad de tus transacciones. Podés comprar con confianza.',
        '',
        '*¿Hacen envios?*',
        'Hacemos envios a todo el país a través de Correo Argentino. También, envíos por moto en el dia (comprando antes de las 13:00 hs) que se entregan de 15:00 a 21:00 hs. Si tenés otra franja horaria, por favor aclaralo en las notas de pedido.',
        '',
        '*¿Puedo retirar la compra en su tienda?*',
        'Sí, una vez confirmada la compra podés retirar el pedido en Av Cabildo 2431, Belgrano, C.A.B.A. Nosotros te enviaremos un mensaje cuando tu compra este lista para retirar.',
        '',
        '*¿Cuál es el tiempo de entrega de los productos?*',
        'El tiempo de entrega de nuestros productos varía dependiendo del producto y la ubicación de envío. Nos esforzamos por enviar tu pedido lo más rápido posible y te mantendremos informado de los tiempos de envío y entrega estimados en todo momento.',
        '',
        '*¿Puedo devolver un producto si no estoy satisfecho?*',
        '¡Por supuesto! Si por alguna razón no estás satisfecho con tu compra, podés devolver el producto dentro de los 30 días de la recepción del mismo. Ponete en contacto con nuestro servicio de atención al cliente para más información sobre nuestra política de devoluciones.',
        '',
        '*¿Cómo puedo pagar mis compras?*',
        'Aceptamos diferentes formas de pago, como tarjetas de crédito y débito, transferencias bancarias y pagos en efectivo. En el momento de la compra, podrás seleccionar la forma de pago que mejor te convenga.'
    ],{
        delay: 6000,
    })
    .addAnswer('Si necesitas más ayuda podes volver al menú digitando *MENU* ¡Saludos!',{
        delay: 2000,
    })

/* EVENTS.WELCOME por opciones menu , 'menu' */

const flowVoice = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer("Lo sentimos, por el momento no podemos escuchar audios😔. Si necesitas consultar algo, digitá *MENU*",{
        delay: 2000,
    });

const menuFlow = addKeyword(['menu', 'menú', 'hola', 'holis', 'buenas', 'buenos', 'hello', 'ola', 'alo'])
    .addAnswer('🙌 ¡Hola! Estás hablando con *PERFUCASA*. ¿En qué podemos ayudarte? ',{
        delay: 8000,
    })
    .addAnswer(
        menu,
        { capture: true },
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", "4", "5", "6", "0", "Reclamos", "Precios", "Contactar", "Redes", "Direccion", "Dirección", "Preguntas", "Salir"].includes(ctx.body)) {
        return fallBack(
        "Respuesta no válida, por favor selecciona una de las opciones."
        );
        }
        switch (ctx.body) {
            case "6":
                bandera = 1
                return gotoFlow(flowReclamos);
            case "2":
                return gotoFlow(flowPrecios);
            case "3":
                return gotoFlow(flowContactar);
            case "4":
                return gotoFlow(flowRedes);
            case "5":
                return gotoFlow(flowDireccion);
            case "1":
                return gotoFlow(flowPreguntas);
            case "Reclamos":
                return gotoFlow(flowReclamos);
            case "Precios":
                return gotoFlow(flowPrecios);
            case "Contactar":
                return gotoFlow(flowContactar);
            case "Redes":
                return gotoFlow(flowRedes);
            case "Direccion":
                return gotoFlow(flowDireccion);
            case "Preguntas":
                return gotoFlow(flowPreguntas);
            case "Salir":
                return await flowDynamic(
                    "Saliendo... Puedes volver a acceder a este menú escribiendo *MENU*");
            case "0":
                return await flowDynamic(
                "Saliendo... Puedes volver a acceder a este menú escribiendo *MENU*"
        );
            }
        }
    );
  


const main = async () => {
    //const adapterDB = new MockAdapter()
    const adapterDB = new MongoAdapter({
        dbUri: process.env.MONGO_DB_URI,
        dbName: "YoutubeTest"
    })
    const adapterFlow = createFlow([menuFlow, flowPrecios, flowDireccion, flowContactar, flowReclamos, flowRedes, flowVoice])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
