import { Injectable } from '@nestjs/common';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';
import { BooksDTO } from './books.dto';

@Injectable()
export class BooksService {

    constructor(
        @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin
    ) { }

    preprocessData(data: any): any {
        if (data.hasOwnProperty("date")) {
            data.date = data.date.toDate().toISOString().substring(0, 10);
        }
        else
            data.date = null;
        return data;
    }

    async findAll(): Promise<BooksDTO[]> {
        const snapshot = await this.firebase.db.collection('books').get();
        const result = [];
        snapshot.forEach(doc => {
            var data = this.preprocessData(doc.data());
            data.key = doc.id;
            result.push(data);
        });
        console.log("Get all books");
        return result;
    }

    async findById(id: string): Promise<BooksDTO> {
        const snapshot = await this.firebase.db.collection('books').doc(id).get();
        console.log("Get book by id: ", id);
        return this.preprocessData(snapshot.data());
    }

    async create(bookDTO: BooksDTO): Promise<any> {
        bookDTO.date = new Date(bookDTO.date)
        console.log(bookDTO);
        const doc = await this.firebase.db.collection('books').add(bookDTO);
        console.log("Create book by id: ", doc.id);
        return { success: true, id: doc.id };
    }

    async editById(id: string, bookDTO: BooksDTO): Promise<any> {
        await this.firebase.db.collection('books').doc(id).set(bookDTO);
        console.log("Edit book by id: ", id);
        return { success: true };
    }

    async deleteById(id: string): Promise<any> {
        await this.firebase.db.collection('books').doc(id).delete();
        console.log("Delete book by id: ", id);
        return { success: true };
    }

}
