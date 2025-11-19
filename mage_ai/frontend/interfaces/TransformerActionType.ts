import SuggestionType from './SuggestionType';
import { ActionTypeEnum, AxisEnum } from './ActionPayloadType';

export default interface TransformerActionType extends SuggestionType {
  id?: number;
}

export const COLUMN_ACTIONS: ActionTypeEnum[] = [
  ActionTypeEnum.AVERAGE,
  ActionTypeEnum.CLEAN_COLUMN_NAME,
  ActionTypeEnum.COUNT,
  ActionTypeEnum.COUNT_DISTINCT,
  ActionTypeEnum.CUSTOM,
  ActionTypeEnum.DIFF,
  ActionTypeEnum.FIRST,
  ActionTypeEnum.FIX_SYNTAX_ERRORS,
  ActionTypeEnum.IMPUTE,
  ActionTypeEnum.LAST,
  ActionTypeEnum.MAX,
  ActionTypeEnum.MEDIAN,
  ActionTypeEnum.MIN,
  ActionTypeEnum.NORMALIZE,
  ActionTypeEnum.REFORMAT,
  ActionTypeEnum.REMOVE,
  ActionTypeEnum.REMOVE_OUTLIERS,
  ActionTypeEnum.SELECT,
  ActionTypeEnum.SHIFT_DOWN,
  ActionTypeEnum.SHIFT_UP,
  ActionTypeEnum.STANDARDIZE,
  ActionTypeEnum.SUM,
];

export const ROW_ACTIONS: ActionTypeEnum[] = [
  ActionTypeEnum.DROP_DUPLICATE,
  ActionTypeEnum.FILTER,
  ActionTypeEnum.SORT,
  ActionTypeEnum.REMOVE,
];

export enum ActionGroupingEnum {
  AGGREGATE = '聚合',
  FORMATTING = '格式化',
  COLUMN_REMOVAL = '列移除',
  SHIFT_ROWS = '在列中移动行',
  MISC = '其他',
  FEATURE_SCALING = '特征缩放',
}

export const ACTION_GROUPING_MAPPING = {
  [AxisEnum.COLUMN]: {
    [ActionGroupingEnum.AGGREGATE]: [
      ActionTypeEnum.AVERAGE,
      ActionTypeEnum.COUNT,
      ActionTypeEnum.COUNT_DISTINCT,
      ActionTypeEnum.FIRST,
      ActionTypeEnum.LAST,
      ActionTypeEnum.MAX,
      ActionTypeEnum.MEDIAN,
      ActionTypeEnum.MIN,
      ActionTypeEnum.SUM,
    ],
    [ActionGroupingEnum.FORMATTING]: [
      ActionTypeEnum.CLEAN_COLUMN_NAME,
      ActionTypeEnum.FIX_SYNTAX_ERRORS,
      ActionTypeEnum.REFORMAT,
    ],
    [ActionGroupingEnum.COLUMN_REMOVAL]: [
      ActionTypeEnum.REMOVE,
      ActionTypeEnum.SELECT,
    ],
    [ActionGroupingEnum.SHIFT_ROWS]: [
      ActionTypeEnum.SHIFT_DOWN,
      ActionTypeEnum.SHIFT_UP,
    ],
    [ActionGroupingEnum.MISC]: [
      ActionTypeEnum.DIFF,
      ActionTypeEnum.IMPUTE,
      ActionTypeEnum.REMOVE_OUTLIERS,
    ],
    [ActionGroupingEnum.FEATURE_SCALING]: [
      ActionTypeEnum.NORMALIZE,
      ActionTypeEnum.STANDARDIZE,
    ],

  },
  [AxisEnum.ROW]: {
    [ActionGroupingEnum.MISC]: [
      ...ROW_ACTIONS,
    ],
  },
};

export const COLUMN_ACTION_GROUPINGS: ActionGroupingEnum[] =
  Object.keys(ACTION_GROUPING_MAPPING[AxisEnum.COLUMN]) as ActionGroupingEnum[];
export const ROW_ACTION_GROUPINGS: ActionGroupingEnum[] = [ActionGroupingEnum.MISC];

export const ACTION_TYPE_HUMAN_READABLE_MAPPING = {
  [AxisEnum.COLUMN]: {
    [ActionTypeEnum.ADD]: '添加列',
    [ActionTypeEnum.AVERAGE]: '按平均值聚合',
    [ActionTypeEnum.CLEAN_COLUMN_NAME]: '清理列名',
    [ActionTypeEnum.COUNT_DISTINCT]: '按不同计数聚合',
    [ActionTypeEnum.COUNT]: '按总计数聚合',
    [ActionTypeEnum.DIFF]: '差异',
    [ActionTypeEnum.FIRST]: '按第一个值聚合',
    [ActionTypeEnum.FIX_SYNTAX_ERRORS]: '修复语法错误',
    [ActionTypeEnum.IMPUTE]: '填充缺失值',
    [ActionTypeEnum.NORMALIZE]: '标准化数据',
    [ActionTypeEnum.STANDARDIZE]: '标准化数据',
    [ActionTypeEnum.LAST]: '按最后一个值聚合',
    [ActionTypeEnum.MAX]: '按最大值聚合',
    [ActionTypeEnum.MEDIAN]: '按中位数值聚合',
    [ActionTypeEnum.MIN]: '按最小值聚合',
    [ActionTypeEnum.REFORMAT]: '重新格式化',
    [ActionTypeEnum.REMOVE_OUTLIERS]: '移除异常值',
    [ActionTypeEnum.REMOVE]: '移除列',
    [ActionTypeEnum.SELECT]: '保留列',
    [ActionTypeEnum.SHIFT_DOWN]: '在列中向下移动行',
    [ActionTypeEnum.SHIFT_UP]: '在列中向上移动行',
    [ActionTypeEnum.SUM]: '按值的总和聚合',
  },
  [AxisEnum.ROW]: {
    [ActionTypeEnum.DROP_DUPLICATE]: '删除重复项',
    [ActionTypeEnum.FILTER]: '筛选',
    [ActionTypeEnum.SORT]: '排序',
    [ActionTypeEnum.REMOVE]: '删除行',
  },
};
