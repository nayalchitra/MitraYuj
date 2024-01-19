const speakEasy = require('speakeasy');
const QRCode = require('qrcode');



const getQRImage = async()=>{
        
    var {base32:secret, otpauth_url} = speakEasy.generateSecret({
        name:"MitraYuj"
    });
    console.log({secret});
    const qrcode = await QRCode.toDataURL(otpauth_url);
    return {secret, qrcode};

}

var verified = (otp,secret)=>{
    return speakEasy.totp.verify({
    secret,
    encoding:'base32',
    token :otp, 
})}

//console.log(getQRImage());
// const secret ="LU4U4OBUHQ5DILTPGBBUMQZDK5DUUVJXIBBFCLBZIFXS6SJMLZLA";
// console.log(verified(835681,secret))       

module.exports = {getQRImage, verified}