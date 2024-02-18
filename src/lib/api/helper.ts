import { NextResponse } from 'next/server'

export enum ErrorType {
    BadRequest = '400',
    Unauthorized = '401',
    PaymentRequired = '402',
    Forbidden = '403',
    NotFound = '404',
    MethodNotAllowed = '405',
    NotAcceptable = '406',
    ProxyAuthenticationRequired = '407',
    RequestTimeout = '408',
    Conflict = '409',
    Gone = '410',
    LengthRequired = '411',
    PreconditionFailed = '412',
    PayloadTooLarge = '413',
    URITooLong = '414',
    UnsupportedMediaType = '415',
    RangeNotSatisfiable = '416',
    ExpectationFailed = '417',
    Teapot = '418', // Just for fun, you can replace this with a relevant code
    MisdirectedRequest = '421',
    UnprocessableEntity = '422',
    Locked = '423',
    FailedDependency = '424',
    UpgradeRequired = '426',
    PreconditionRequired = '428',
    TooManyRequests = '429',
    RequestHeaderFieldsTooLarge = '431',
    UnavailableForLegalReasons = '451',
    InternalServerError = '500',
    NotImplemented = '501',
    BadGateway = '502',
    ServiceUnavailable = '503',
    GatewayTimeout = '504',
    HTTPVersionNotSupported = '505',
    VariantAlsoNegotiates = '506',
    InsufficientStorage = '507',
    LoopDetected = '508',
    NotExtended = '510',
    NetworkAuthenticationRequired = '511',
    NetworkConnectTimeoutError = '599',
}

export interface NxtError {
    type: ErrorType
    message: string
    data?: any
    docs?: DocPage
    missingFields?: Record<string, string> | (string | null)[]
}

export interface DocPage {
    title?: string
    url?: URL | string
}

export function createError(
    type: ErrorType,
    message: string,
    data?: any,
    docs?: DocPage
): NxtError {
    return {
        type,
        message,
        docs,
        data,
    }
}

export function error({ type, message, docs, data, missingFields }: NxtError): NextResponse {
    var errorTypeName = ''
    for (const [key, value] of Object.entries(ErrorType)) {
        if (value === type) errorTypeName = formatTypeName(key)
    }

    return NextResponse.json(
        {
            type: errorTypeName || type,
            message,
            data,
            docs,
            ...(missingFields && {
                missingFields,
            }),
        },
        {
            status: parseInt(type),
            statusText: message,
        }
    )
}

function formatTypeName(errorTypeName: string): string {
    // Adds spaces between words
    errorTypeName = errorTypeName.replace(/([A-Z])/g, ' $1')
    // Remove first character if its a space
    if (errorTypeName.startsWith(' ')) errorTypeName = errorTypeName.slice(1)
    // Capitalise first letter
    errorTypeName = errorTypeName.charAt(0).toUpperCase() + errorTypeName.slice(1)
    return errorTypeName
}

export enum SuccessType {
    Ok = '200',
    Created = '201',
    Accepted = '202',
    NoContent = '204',
    ResetContent = '205',
    PartialContent = '206',
    MultiStatus = '207',
    AlreadyReported = '208',
    IMUsed = '226',
    MultipleChoices = '300',
    MovedPermanently = '301',
    Found = '302',
    SeeOther = '303',
    NotModified = '304',
    UseProxy = '305',
    TemporaryRedirect = '307',
    PermanentRedirect = '308',
}

export interface NxtSuccess {
    type: SuccessType
    message: string
    data?: any
    docs?: DocPage
}

export interface NxtSuccessPagination {
    type: SuccessType
    message: string
    data?: any
    docs?: DocPage
    meta?: NxtSuccessMeta
}

export interface NxtSuccessMeta {
    limit: number
    page: number
    totalPages: number
    total: number
}

export function createSuccess(
    type: SuccessType,
    message: string,
    data?: any,
    docs?: DocPage
): NxtSuccess {
    return {
        type,
        message,
        docs,
        data,
    }
}

export function createSuccessPagination(
    type: SuccessType,
    message: string,
    data?: any,
    docs?: DocPage,
    meta?: NxtSuccessMeta
): NxtSuccessPagination {
    return {
        type,
        message,
        data,
        meta,
        docs,
    }
}

export function success({
    type,
    message,
    docs,
    ...rest
}: NxtSuccess | NxtSuccessPagination): NextResponse {
    var successTypeName = ''
    for (const [key, value] of Object.entries(SuccessType)) {
        if (value === type) successTypeName = formatTypeName(key)
    }

    return NextResponse.json(
        {
            type,
            message,
            ...(rest.data && { data: rest.data }),
            docs,
            //   @ts-ignore
            ...(rest.meta && {
                meta: {
                    //   @ts-ignore
                    ...rest.meta,
                    //   @ts-ignore
                    hasMore: rest.meta.page < rest.meta.totalPages,
                },
            }),
        },
        {
            status: parseInt(type),
            statusText: message,
        }
    )
}
