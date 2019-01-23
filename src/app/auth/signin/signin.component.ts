import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup
  errorMessage: string

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    // créer formulaire à l'initialisation.
    // Formulaire doit être prêt avant que l'utilisateur commmence à taper.
    this.initSignInForm()
  }
  // création formulaire
  initSignInForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  // passer les datas du formulaire au service d'authentification
  onSignIn() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authService.userSignIn(email, password)
    .then(
      () => {
        // authentifié ? rediriger vers l'accueil
        this.router.navigate(['/blogs'])
      },
      (error) => { this.errorMessage = error }
    )
  }

}
