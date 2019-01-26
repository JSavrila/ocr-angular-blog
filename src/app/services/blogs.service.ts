import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  
  userId: string
  posts: any[] = []
  collection: string = 'blogs'
  postsSubject = new Subject<any[]>()

  constructor(private authService: AuthService) {}

  // récupérer userID
  getUserId() {
    this.userId = this.authService.getUserID()
  }

  // émettre changement posts[]
  emitPosts() {
    this.postsSubject.next(this.posts)
  }

  // récupérer postes de l'utilisateur
  getPosts() {
    this.getUserId()
    return new Promise((resolve, reject) => {
      firebase.firestore().collection(this.collection).where("authorId", "==", this.userId)
      .onSnapshot((querySnapshot) => {
         // former array object { id, data }
         let posts: any[] = []
         querySnapshot.forEach((doc) => {
           // push de l'id et des datas contenu vers un array temporaire
           posts.push({ docId: doc.id, data: doc.data() })
         })

         /* trier du plus récent au plus ancien: trier les dates par
            décroissant */
         posts.sort((a, b) => { return b.data.date - a.data.date });

         this.posts = posts;

         // émettre posts[]
         this.emitPosts()
      });
    })
  }

  // ajouter un poste
  addPost(post: Post) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection(this.collection).add(post)
      .then(() => resolve(), (error) => reject(error))
    })
  }

  // incrémenter approval de 1
  upvote(id: string) {
    const docRef = firebase.firestore().collection(this.collection).doc(id)

    return firebase.firestore().runTransaction((transaction) => {
      // idempotence: ce code peut s'exécuter plusieurs fois en cas de conflit
      return transaction.get(docRef).then((doc) => {
        if (!doc.exists) {
            throw "Document does not exist!";
        }

        var newApproval = doc.data().approval + 1;
        transaction.update(docRef, { approval: newApproval });
      });
    })
    .then(
      () => {},
      (error) => { throw(error) })

  }

  // décrémenter approval de 1
  downvote(id: string) {
    const docRef = firebase.firestore().collection(this.collection).doc(id)

    return firebase.firestore().runTransaction((transaction) => {
      // idempotence: ce code peut s'exécuter plusieurs fois en cas de conflit
      return transaction.get(docRef).then((doc) => {
          if (!doc.exists) {
              throw "Document does not exist!";
          }
  
          var newApproval = doc.data().approval - 1;
          transaction.update(docRef, { approval: newApproval });
      });
    })
    .then(
      () => {},
      (error) => { throw(error) })

  }

  // supprimer poste
  deleteSinglePost(id: string) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection(this.collection).doc(id).delete()
      .then(() => resolve(), (error) => reject(error))
    })
  }
}
