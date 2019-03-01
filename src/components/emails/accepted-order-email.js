const Handlebars = require('handlebars');

let source = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
   <head>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
       <title>Ichiro Restaurant</title>
       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

       <style>
           @media screen and (min-width: 800px) {
               .footer {
                   width: 33%
               }
           }
       </style>
    </head>
    <body style="margin: 0; padding: 0">

        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600px">

            <table border="0" cellpadding="0" cellspacing="0" width="100%">

                <tr>
                    <td align="left"  style="padding: 10px 0 10px 0">
                        <img src="https://i.imgur.com/OXKBamH.jpg"  alt="Logo" title="Logo"  width="150" height="89" style="display: block" />
                    </td>
                </tr>
                <tr align="left"  style="padding: 10px 0 10px 0">  
                    <td style="font-size: 10px">
                       <h1>Your Order has been accepted and will be ready in 30 min for collection !</h1>
                    </td>
                    <td style="font-size: 8px">
                       {{day}} {{time}}
                    </td>
                </tr>
                <tr align="left"  style="margin-top: 15px; margin-bottom: 15px; font-size: 10px">
                    <td>
                        <b>ORDER NUMBER:</b> {{orderNumber}}
                    </td>
                </tr>
                <tr align="left"  style="margin: 15px 0 15px 0; font-size: 10px;">
                    {{#each order as |item|}}
                        <tr align="left"  style="padding: 15px 0 15px 0; font-size: 10px;">
                             <td>{{item.quantity}} {{item.name}} £{{item.price}}</td>
                        </tr>
                </tr>
                {{/each}}
                <tr align="left"  style="margin: 15px 0 0 0; font-size: 10px">
                    <p>TOTAL: £{{total}}</p>
                </tr>
            </table>
                       
        </table>
    </body>
</html>`

const template = Handlebars.compile(source);

module.exports  = template;