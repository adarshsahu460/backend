import otpG from 'otp-generator'
export default async function(){
    const otp = otpG.generate(6, { lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
    return otp;
}