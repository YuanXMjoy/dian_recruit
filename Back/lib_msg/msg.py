# -*- coding: utf-8 -*-
from lib_msg.alidayu import AlibabaAliqinFcSmsNumSendRequest
import json




'''Chen Kuang's Alidayu account'''
url = 'http://gw.api.taobao.com/router/rest'
appkey = '23469194'
secret = '7e14776fc09781b01838d35b75a47fde'
sms_type = 'normal'
sign_name = 'Dian团队招新'


# req.sms_param = json.dumps(params)
# req.rec_num = '15306820677'
# req.sms_template_code = 'SMS_16725786'


class DayuMsg:

    req = []

    def __init__(self, sms_template_code):
        self.req = AlibabaAliqinFcSmsNumSendRequest(appkey, secret, url)
        self.req.sms_template_code = sms_template_code
        self.req.sms_type = sms_type
        self.req.sms_free_sign_name = sign_name

    def send(self, params, phone):
        if self.req:
            self.req.rec_num = phone
            self.req.sms_param = json.dumps(params)
            # self.req.extend = phone
            try:
                resp = self.req.getResponse()
                return resp
            except Exception as e:
                raise e
                return False
        else:
            return False



