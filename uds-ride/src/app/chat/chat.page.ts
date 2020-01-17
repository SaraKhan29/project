import { Component, OnInit } from '@angular/core';
import { ChatService, ChatMessage } from '../services/chat.service';
import firebase = require('firebase');
import { ProfileService, Profile } from '../services/profile.service';
import { NavController, AlertController } from '@ionic/angular';
import { checkLoggedIn } from '../util/auto-login';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
    private messages: ChatMessage[];
    private messagesLoaded = false;

    private user = firebase.auth().currentUser;

    private messageDraft: string;

    constructor(
        private profileService: ProfileService,
        private chatService: ChatService,
        private alertCtrl: AlertController,
        private navCtrl: NavController
    ) { }

    async ngOnInit() {
        if (!await checkLoggedIn(this.alertCtrl, this.navCtrl)) {
            return;
        }

        this.user = firebase.auth().currentUser;

        this.messages = this.chatService.getChatMessages('test');
        this.messagesLoaded = true;

        this.chatService.getChatMessageUpdates('test').subscribe(res => {
            this.messages = res;
            this.messagesLoaded = true;
        });
    }

    async sendMessage() {
        await this.chatService.sendMessage({
            author: this.user.uid,
            content: this.messageDraft,
            ride: 'test',
            date: new Date()
        });

        this.messageDraft = '';
    }

    async deleteMessage(message: ChatMessage) {
        const confirmDialog = await this.alertCtrl.create({
            header: 'Confirm deletion',
            message: 'Do you really want to delete this message?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        return;
                    }
                },
                {
                    text: 'Delete',
                    handler: async () => {
                        const alert = await this.alertCtrl.create({
                            header: 'Message deleted',
                            message: 'This message has been successfully deleted.',
                            buttons: ['Okay']
                        });

                        try {
                            await this.chatService.deleteMessage(message.id);
                        } catch (err) {
                            alert.setAttribute('header', 'Error');
                            alert.setAttribute('message', err.message);
                        }

                        alert.present();
                        await alert.onDidDismiss();
                    }
                }
            ]
        });
        confirmDialog.present();
    }
}
