import {Container} from "inversify";
import TYPES from "./types";
import ExpressErrorHandler from "../modules/error/ExpressErrorHandler";
import RestExpressErrorHandler from "../modules/error/RestExpressErrorHandler";
import {AuthClient} from "../modules/api/huawei/auth";
import {HttpClient} from "../modules/api/huawei/utils/apiRequest";
import {HuaweiPush} from "../modules/api/huawei/push/huaweiPush";
import * as process from "process";
import dictionary from '../dictionary.json';
import {createLangService} from "../modules/language";
import type {LangService} from "../modules/language/types";


const {HUAWEI_APP_ID, HUAWEI_SECRET} = process.env;

const container = new Container();

container.bind<ExpressErrorHandler>(TYPES.ExpressErrorHandler).to(RestExpressErrorHandler);
container.bind<LangService>(TYPES.LangService).toConstantValue(createLangService(dictionary));

if(HUAWEI_SECRET && HUAWEI_APP_ID) {
    container.bind<HttpClient>(HttpClient).toSelf()
    container.bind<AuthClient>(AuthClient).toConstantValue(new AuthClient({
        appId: HUAWEI_APP_ID,
        appSecret: HUAWEI_SECRET
    }));
    container.bind<HuaweiPush>(HuaweiPush).toSelf()
}

export default container;