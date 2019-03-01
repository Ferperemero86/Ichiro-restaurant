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
                    <td style="font-size: 7px">
                        <h1>Password Resset</h1>
                    </td
                </tr>
                <tr>
                    <td>
                        <p>Please click the link to renew password</p>
                    </td>
                </tr>
                <tr align="left"  style="margin: 15px 0 15px 0; font-size: 10px;">
                    <a href="ichirorestaurant.co.uk/ressetpassword/{{recoveryLink}}">{{recoveryLink}}</a>
                </tr>              
            </table>
                       
        </table>
    </body>
</html>`

const template = Handlebars.compile(source);

module.exports  = template;