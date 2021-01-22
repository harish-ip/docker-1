export class User {
    token?: string;
}

export class UserRole {
    role?: string;
}

export class Register {
    firstname: string;
    lastname: string;
    username: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    mobilenumber: number;
    extensionNumber?: string;
    country: string;
    role?: string;
    createdBy?: string;
    organizationName?: string;
    userImage?: string;
    state?: string;
    city?: string;
    location?: string;
    rolealias?: string;
    clientmaster?: string;
    siteadmin?: string;
    siteuser?: string
    userId?: number;
    _id?: id
}

class id {
    $numberLong: string;
}

export class Contactus {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    read?: boolean;
    date?: string;
    time?: string
    replymsg?: string;
    emailFrom?: string;
    notificationId?: number;
    emails?: email;
    id?: number;
    sno?: number;

    /*     _id?: id */
}

class email {
    email?: emails[];
}

export class JWT {
    sub: string;
    auth:
        {
            authority: string;
        };
    iat: number;
    exp: number;
}

export class Country {
    extensionNumber: number;
    countryCode: string;
    cname: string;
    cid: number;
    phonecode: string;
}

export class State {
    sid?: number;
    sname?: string;
    cid?: number;
    statecode?: string;
}
export class City {
    cityid: string;
    name: string;
}

export class ClientMasterList {
    username?: string;
    organizationName?: string;
    id?: string
}

export class Tenant {
    tId?: string;
    tName: string;
    tType: string;
    signupDate: Date;
    email: string;
    id?: string;
}

export class Product {
    productId?: number;
    productName: string;
    productPrice: number;
    productType?: string;
    productDescription: string;
    productDuration?: string;
    trialDuration?: string;
    productImage?: string;
    productIcon?: string;
    productURL?: string;
    id?: string;
    suiteId?: number;
    suiteName?: string;
    startDate?: string;
    trial?: boolean;
    extensionDays?: number;
    endDate?: string;
    paymentMode?: string;
    transactionNumber?: string;
    assignedBy?: string;
    subscribedBy?: string;
}

export class Suite {
    suiteId?: number;
    suiteName: string;
    suiteType: string;
    suiteDescription: string;
    products?: Product[];
}

export class Checkbox {
    checked?: boolean;
    value?: string;
}

export class Coupon {
    couponId?: number;
    couponCode: string;
    validFrom: Date;
    validTo: Date;
    amount: number;
    description: string;
    createdDate?: string;
}

export class changePwd {
    oldPassword?: string;
    newPassword?: string;
}

export class mail {
    subject: string;
    body: string;
    emailFrom?: string;
}

export class TenantCoupons {
    couponCode: string;
    emailId: string;
    userEmailList: string;
    users: emails[]
}

export class emails {
    email: string;
    username: string;
}

export class SiteAdminList {
    username?: string;
    organizationName?: string;
    id?: string
}

export class UniqueProducts {
    _id: string;
    uniqueProducts?: Product[]
}