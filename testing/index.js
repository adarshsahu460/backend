import dotenv from 'dotenv'
import { prisma } from '../actions/forgot.js'

dotenv.config({
  path: '../.env'
})

async function login() {
  await prisma.user.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.adminOTP.deleteMany()
  await prisma.userOTP.deleteMany()
}

// login()

async function addDate(pr,date) {
  
}

addDate(100,new Date())