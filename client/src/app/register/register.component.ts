import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //child - parent communications. Also see home.component.html
  cancelRegister = output<boolean>();
  private accountService = inject(AccountService);

  model: any = {};

  Register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.Cancel();
      },
      error: error => console.log(error)
    })
  }

  Cancel() {
    this.cancelRegister.emit(false);
  }
}
