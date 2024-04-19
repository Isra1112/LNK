let nodemailer = require('nodemailer');
const cron = require('node-cron');
const Data = require('../models/data.model');
const moment = require('moment');
const { data } = require('../models/index.model');
const { forEach } = require('lodash');



// class MailService {
//     async createMail(data) {
//         let result

//         try {
//             let testAccount = await nodemailer.createTestAccount()
//             let transporter = nodemailer.createTransport({
//                 host: 'smtp.ethereal.email',
//                 port: 587,
//                 secure: false,
//                 auth: {
//                     user: testAccount.user,
//                     pass: testAccount.pass
//                 }
//             });
//             let mailContent;
//             if (data && data.multiLine) {
//                 let multiLine = data.multiLine;
//                 multiLine.forEach(el => {
//                     if (!mailContent) {
//                         mailContent = el + "\n"
                        
//                     }else{
//                         mailContent += el + "\n"
//                     }
//                 });
//             } else {
//                 mailContent = data.singleLine
//             }

//             let mailOptions = {
//                 from: testAccount.user,
//                 to: data.to,
//                 subject: data.subject,
//                 text: mailContent
//             };
//             result = await transporter.sendMail(mailOptions);
            
//             // console.log(nodemailer.getTestMessageUrl(result));
//             return result
//         } catch (e) {
//             logEvent.emit('APP-ERROR', {
//                 logTitle: 'POST-SENDMAIL-SERVICE-FAILED',
//                 logMessage: e
//             });
//             throw new Error(e.message)
//         }


//     }
// }

const createMail = async(data) => {
    let result

    try {
        let testAccount = await nodemailer.createTestAccount()
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        let mailContent;
        // if (data && data.multiLine) {
        //     let multiLine = data.multiLine;
        //     multiLine.forEach(el => {
        //         if (!mailContent) {
        //             mailContent = el + "\n"
                    
        //         }else{
        //             mailContent += el + "\n"
        //         }
        //     });
        // } else {
        //     mailContent = data.singleLine
        // }

        let mailOptions = {
            from: testAccount.user,
            to: data.email,
            subject: "Daily Data",
            text: mailContent
        };
        result = await transporter.sendMail(mailOptions);
        
        // console.log(nodemailer.getTestMessageUrl(result));
        return result
    } catch (e) {
        logEvent.emit('APP-ERROR', {
            logTitle: 'POST-SENDMAIL-SERVICE-FAILED',
            logMessage: e
        });
        throw new Error(e.message)
    }
}



exports.initScheduledJobs = () => {
    const scheduledJobFunction = cron.schedule("* * * * *", async() => {
        const today = moment().startOf('day')

        const dataToSend = await Data.find({ 
            date: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }
        });
        console.log(dataToSend);
        dataToSend.forEach(async(data) => {
            await createMail(data);
        });
        console.log('Scheduled email sent at 8:00 AM.');
    });
  
    scheduledJobFunction.start();
};

// module.exports = MailService;