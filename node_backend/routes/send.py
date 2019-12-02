import sys
import requests
import json

URL = 'https://www.way2sms.com/api/v1/sendCampaign'
session = requests.Session()
session.trust_env = False
proxies = {
  "http": None,
  "https": None,
}
# get request
def sendPostRequest(reqUrl, apiKey, secretKey, useType, phoneNo, senderId, textMessage):
  req_params = {
  'apikey':'RJ4UQ3X1Y3QZIAGXWDTEXGLU0RHH3YRO',
  'secret':'BJ1KLCTPKU13RUOR',
  'usetype':'stage',
  'phone': int(sys.argv[1]),
  'message':sys.argv[2],
  }
  return requests.post(reqUrl, req_params,proxies=proxies)

# response = sendPostRequest(URL, 'provided-api-key', 'provided-secret', 'prod/stage', 'valid-to-mobile', 'active-sender-id', 'message-text' )
# if 'success' in response.text:
# 	print('Message Sent')



import smtplib 
  
# creates SMTP session 

s = smtplib.SMTP('smtp.gmail.com', 587) 
  
# start TLS for security 
s.starttls() 
  
# Authentication 
s.login("temptrash32@gmail.com", "publicpasswordright") 

# sending the mail 

f=open("temp.txt","w+")
f.write(str(sys.argv[2]))
f.close()
try:
  s.sendmail("temptrash32@gmail.com", sys.argv[3], "\n"+str(sys.argv[2])) 
except:
  print("Email : Not Sent")
# terminating the session 
s.quit()
sys.stdout.flush()