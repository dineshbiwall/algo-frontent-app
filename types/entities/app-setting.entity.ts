import { AppSettingNameEnum } from "../../enums/app-setting.enum";
export interface AppSetting {
  id: string;
  name: AppSettingNameEnum;
  value: string;
  description: string;
}
