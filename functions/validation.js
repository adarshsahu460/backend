import {z} from 'zod'

export const otpSchema = z.string().min(6).max(6)
export const emailSchema = z.string().email()
export const passwordSchema = z.string().min(8).max(16)

const phoneNumberRegex = /^\d{10}$/;
export const phoneNumberSchema = ()=>{z.string().refine((val) => phoneNumberRegex.test(val))}
export const nameSchema = z.string().min(3).max(20)
export const numberStringSchema = z.string().refine((val) => !isNaN(Number(val)))