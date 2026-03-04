import { FromRenderMessage, FromRender } from '@virid/main'
@FromRender('close-window')
export class CloseWindowMessage extends FromRenderMessage {}
@FromRender('minimize-window')
export class MinimizeWindowMessage extends FromRenderMessage {}
@FromRender('maximize-window')
export class MaximizeWindowMessage extends FromRenderMessage {}
