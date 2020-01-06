import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile, ProfileService } from './profile.service';

export interface ChatMessageData {
    content: string;
    author: DocumentReference;
    ride: string;
    date: Date;
}

export class ChatMessage {
    public author: Profile;

    public content: string;
    public ride: string;
    public date: Date;
    public id: string;

    constructor(id: string, private data: ChatMessageData, chatService: ChatService, profileService: ProfileService) {
        this.content = this.data.content;
        this.ride = this.data.ride;
        this.date = this.data.date;
        this.id = id;

        chatService.getMessage(id).subscribe((message: ChatMessageData) => {
            this.data = message;
            this.content = data.content;
            this.ride = data.ride;
            this.date = data.date;
        });

        profileService.getProfile(data.author.id).subscribe(profile => {
            this.author = profile;
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private chatMessageCollection: AngularFirestoreCollection<ChatMessageData>;

    private chatMessages: Observable<ChatMessage[]>;

    constructor(db: AngularFirestore, profileService: ProfileService) {
        this.chatMessageCollection = db.collection<ChatMessageData>('chat_messages');

        this.chatMessages = this.chatMessageCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return new ChatMessage(id, data, this, profileService);
                });
            })
        );
    }

    getChatMessages(ride: string) {
        return this.chatMessages.pipe(
            map(messages => {
                return messages.filter(message => {
                    return message.ride === ride;
                }).sort((a, b) => {
                    return a.date < b.date ? -1 : 1;
                });
            })
        );
    }

    getMessage(id: string) {
        return this.chatMessageCollection.doc<ChatMessageData>(id).valueChanges();
    }

    sendMessage(message: ChatMessageData) {
        return this.chatMessageCollection.add(message);
    }

    deleteMessage(id: string) {
        return this.chatMessageCollection.doc(id).delete();
    }
}
