# Telecm: Click2Call API #

Telecmi provides a complete, configurable, and easy-to-use Click2Call API which built on top of WebRTC.

### [Telecmi](http://telecmi.com)

## Setup


**Include the library**

```html
<script src="https://app.telecmi.com/1.0/telecmi-sdk.min.js"></script>
```

**Create Telecmi Object**  
Following syntax used to initialize telecmi object 
```javascript
var telecmi = new Telecmi(); 
```

## ContactHUB cloud  connections
**Connect**

Using this syntax you can connect to contacthub cloud 
```javascript
telecmi.startCHUB()
//It will connect you to contacthub cloud
```

## Click2Call cloud  connections
**Connect**

Using this syntax you can connect to click2call cloud
```javascript
telecmi.startC2C()
//It will connect you to contacthub cloud
```



## Internet calls
**Call**

Using this syntax you can make outbound calls to your application
```javascript
  telecmi.call('your internetno');
  //Inetnetno is nothing but your APP ID
```

**Hangup**

Using this syntax you can hangup your call
```javascript
  telecmi.hangup();
  //Its hangup your call
```
**Mute/Unmute**

Using this syntax you can mute and unmute your mic
```javascript
  telecmi.mic();
  //When you call this method first time it will mute mic ,if you call second timr it will unmute you mmic
```
**DTMF**

Using this syntax you can send dtmf tone to your Application

```javascript
  telecmi.key('1');
  //You can pass dtmf tone to your contacthub/click2call APP,DTMF only used to connect with ivr
```

**Logout**

Using this syntax you can logout from session
```javascript
  telecmi.logout();
```

**Status**

Using this callback you can get all the event in your call.
```javascript
  telecmi.onStatus=function(data){
  //Data is JSON it contain event and status
  };
```
## [List of event and status ](https://github.com/telecmi/click2call/wiki/onStatus)


