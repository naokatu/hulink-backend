/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** User */
export interface User {
  /** @format uuid */
  id: string
  name: string
  linkUsers?: LinkUser[]
}

/** LinkUser */
export interface LinkUser {
  /** @format uuid */
  id: string
  /** @format uuid */
  userId: string
  name: string
  /** @format int32 */
  weight?: number
  label?: string
  sex?: string
}

/** CreateUserInput */
export interface CreateUserInput {
  name: string
}

/** CreateLinkUserInput */
export interface CreateLinkUserInput {
  name: string
  interact: string[]
  label?: string
  sex?: string
  /** @format uuid */
  userId: string
}

/** UpdateLinkUserInput */
export interface UpdateLinkUserInput {
  name: string
  interact: string[]
  label?: string
  sex?: string
  /** @format uuid */
  userId: string
}

/** 400ValidationError */
export interface Type400ValidationError {
  code: string
  errors: {
    path: string
    message: string
    errorcode?: string
  }[]
}

/** 401Error */
export interface Type401Error {
  code: string
  message: string
}

/** 500Error */
export interface Type500Error {
  code: string
  message: string
}

/** 503Error */
export interface Type503Error {
  code: string
  message: string
}

/** Pagenation */
export interface Pagenation {
  total?: number
}

/** CreateUserError */
export interface CreateUserError {
  code: string
  message: string
}

/** CreateLinkUserError */
export interface CreateLinkUserError {
  code: string
  message: string
}

export interface CreateLinkUserInputCopy {
  name: string
  /** @format uuid */
  userId: string
  interact: string[]
  label?: string
  sex?: string
}

export namespace User {
  /**
   * No description
   * @name PostUser
   * @summary ユーザを作成する
   * @request POST:/user
   */
  export namespace PostUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreateUserInput
    export type RequestHeaders = {
      /** Bearer xxx */
      authorization?: string
    }
    export type ResponseBody = {
      data?: {
        user: User
      }
      errors?: CreateUserError[]
    }
  }
  /**
   * No description
   * @name GetUser
   * @summary ユーザを取得する
   * @request GET:/user
   */
  export namespace GetUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {
      /** Bearer xxx */
      authorization?: string
    }
    export type ResponseBody = {
      data: {
        user: User
      }
    }
  }
}

export namespace LinkUser {
  /**
   * No description
   * @name GetLinkUser
   * @summary リンクユーザを一覧取得する
   * @request GET:/link-user
   */
  export namespace GetLinkUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {
      /** Bearer xxx */
      authorization?: string
    }
    export type ResponseBody = {
      data: {
        linkUsers: LinkUser[]
      }
    }
  }
  /**
   * No description
   * @name PostLinkUser
   * @summary リンクユーザを作成する
   * @request POST:/link-user
   */
  export namespace PostLinkUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreateLinkUserInput
    export type RequestHeaders = {
      /** Bearer xxx */
      authorization?: string
    }
    export type ResponseBody = {
      data?: {
        linkUser: LinkUser
      }
      errors?: CreateLinkUserError[]
    }
  }
  /**
   * No description
   * @name PutLinkUser
   * @summary リンクユーザを更新する
   * @request PUT:/link-user
   */
  export namespace PutLinkUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {
      /** Bearer xxx */
      authorization?: string
    }
    export type ResponseBody = void
  }
}
