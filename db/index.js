import { PrismaClient } from '@prisma/client'

export class PrismaSingleton {
  static instance;

  constructor() {
    if (PrismaSingleton.instance) {
      return PrismaSingleton.instance;
    }

    PrismaSingleton.instance = new PrismaClient();
    return PrismaSingleton.instance;
  }

  static getInstance() {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }
    return PrismaSingleton.instance;
  }
}