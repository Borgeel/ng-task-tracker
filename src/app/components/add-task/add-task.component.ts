import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  Title: string = '';
  Date: string = '';
  Reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.Title) {
      alert('Please add a task');
      return;
    }
    const newTask = {
      Title: this.Title,
      Date: this.Date,
      Reminder: this.Reminder,
    };

    this.onAddTask.emit(newTask);

    this.Title = '';
    this.Date = '';
    this.Reminder = false;
  }
}
