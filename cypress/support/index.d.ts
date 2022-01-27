/// <reference types="cypress" />
/// <reference path="commands.d.ts" />

import { default as dayjs } from 'dayjs';

declare global {
  namespace Cypress {
    interface Cypress {
      baseUrl(): string
      dayjs: (date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean) => dayjs.Dayjs
    }
  }
}