import { Controller } from '@virid/core'
import { type PipelineConfig, SaveSettingsMessage, SettingComponent } from '@/ccs/settings'
import { OnHook, Project, Responsive, Watch } from '@virid/vue'

@Controller()
export class PipelineController {
  @Project(SettingComponent, i => i.pipeline)
  public pipelineConfig!: PipelineConfig

  @Responsive()
  public setting!: PipelineConfig
  /**
   * *setup阶段拷贝一份设置给自己
   */
  @OnHook('onSetup')
  public setup() {
    this.setting = JSON.parse(JSON.stringify(this.pipelineConfig))
  }
  /**
   * *只要setting变，那就发消息更新
   */
  @Watch<PipelineController>(i => i.setting, { deep: true })
  public updateTheme() {
    SaveSettingsMessage.send(settings => {
      settings.pipeline = JSON.parse(JSON.stringify(this.setting))
    })
  }
}
