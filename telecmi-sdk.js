window.Telecmi = (function() {
            var self = this;
            var verto_callback = {
                //Login event callback
                onWSLogin: function(v, success) {
                    self.onStatus({
                        event: 'ws',
                        status: 'open'
                    })
                    if (success) {
                        self.onStatus({
                            event: 'register',
                            status: true
                        })
                    } else {
                        self.onStatus({
                            event: 'register',
                            status: false
                        })
                    }
                },
                onDialogState: function(d) {
                    switch (d.state.name) {
                        case "ringing":
                            self.onStatus({
                                event: 'ringing',
                                status: true
                            })
                            break;
                        case "trying":
                            self.onStatus({
                                event: 'trying',
                                status: true
                            })
                            break;
                        case "early":
                            self.telecmi_call = d;
                            self.onStatus({
                                event: 'early',
                                status: true
                            })
                            break;
                        case "active":
                            self.telecmi_call = d;
                            self.onStatus({
                                event: 'connected',
                                status: true
                            })
                            break;
                        case "hangup":
                            self.onStatus({
                                event: 'hangup',
                                status: true
                            })
                            if (self.telecmi_call) {
                                self.telecmi_call.hangup()
                                self.telecmi_call=null
                            }
                            break;
                        case "destroy":
                            self.onStatus({
                                event: 'destroy',
                                status: true
                            })
                            if (self.telecmi_call) {
                                self.telecmi_call.hangup()
                            }
                            break;
                    }
                },
                onWSClose: function(v, success) {
                    if (success) {
                        self.onStatus({
                            event: 'ws',
                            status: 'close'
                        })
                    }
                },
                onEvent: function(v, e) {}
            };


            Telecmi.prototype.audioTag = function() {
                var audio_tag = document.createElement("AUDIO");
                audio_tag.setAttribute('autoplay', true);
                audio_tag.setAttribute('hidden', true);
                audio_tag.setAttribute("id", "telecmi");
                document.body.appendChild(audio_tag);
            }


            //Initilize contacthub
            Telecmi.prototype.startCHUB = function() {
                //create Audio Tag and append to body
                this.audioTag();
                //Initilize verto object
                this.verto = new $.verto({
                    login: 'telecmi@chubfs.telecmi.com',
                    passwd: 'telecmi',
                    socketUrl: 'wss://chubfs.telecmi.com',
                    tag: "telecmi",
                    ringFile: null
                }, verto_callback);

            }

            //Initilize click2call
            Telecmi.prototype.startC2C = function() {
                //create Audio Tag and append to body
                this.audioTag();
                //Initilize verto object
                this.verto = new $.verto({
                    login: 'telecmi_c2c@c2cfs.telecmi.com',
                    passwd: 'telecmi_c2c',
                    socketUrl: 'wss://c2cfs.telecmi.com',
                    tag: "telecmi",
                    ringFile: null
                }, verto_callback);

            }

            //Make Call to inetnet number
            Telecmi.prototype.call = function(inetno) {
                console.error(this.telecmi_call);
                if (this.telecmi_call) {
                    return;
                }
                if (inetno) {
                    if (this.verto) {
                        this.telecmi_call = this.verto.newCall({
                            destination_number: inetno.toString(),
                            caller_id_number: 'telecmi',
                            useVideo: false
                        });
                        
                    }
                    return;
                }
                return
            }

            //Hangup call
            Telecmi.prototype.hangup = function() {

                if (this.telecmi_call) {
                    this.telecmi_call.hangup()
                }

            }

            //Status callback
            Telecmi.prototype.onStatus = function(data) {
                console.log(data)
            }

            //send dtmf done
            Telecmi.prototype.key = function(key) {

                var key = key | 0
                if (this.telecmi_call) {
                    this.telecmi_call.dtmf(key.toString())
                }

                return;
            }

            //Mute and unmute
            Telecmi.prototype.mic = function() {
                if (this.telecmi_call) {
                    this.telecmi_call.setMute('toggle');
                }
                return;
            }

            //Logout from telecmi cloud
            Telecmi.prototype.logout = function() {
                if (this.verto) {
                    this.verto.logout();
                }
                return;
            }

        })