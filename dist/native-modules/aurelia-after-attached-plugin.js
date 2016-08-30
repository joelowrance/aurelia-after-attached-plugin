import { View } from 'aurelia-templating';
import { TaskQueue } from 'aurelia-task-queue';

export function configure(aurelia) {
  var taskQueue = aurelia.container.get(TaskQueue);

  var attached = View.prototype.attached;
  View.prototype.attached = function () {
    var _this = this;

    var isAttached = this.isAttached;
    attached.call(this);

    if (!isAttached) {
      if (this.bindingContext && this.bindingContext.afterAttached) {
        taskQueue.queueTask(function () {
          return _this.bindingContext.afterAttached();
        });
      }
    }
  };
}