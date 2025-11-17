import {
  AISparkle,
  BatchPipeline,
  IntegrationPipeline,
  StreamingPipeline,
  TemplateShapes,
  Upload,
} from '@oracle/icons';
import { PipelineTypeEnum } from '@interfaces/PipelineType';
import { UNIT } from '@oracle/styles/units/spacing';
import { randomNameGenerator } from '@utils/string';

const ICON_SIZE = UNIT * 1.5;

export const getNewPipelineButtonMenuItems = (
  createPipeline: (
    reqBody: { pipeline: { name: string, type?: PipelineTypeEnum } },
  ) => void,
  opts?: {
    showAIModal?: () => void;
    showBrowseTemplates?: () => void;
    showCreatePipelineModal?: (opts: { pipelineType: PipelineTypeEnum }) => void;
    showImportPipelineModal?: () => void;
  },
) => {
  const arr = [
    {
      beforeIcon: <BatchPipeline />,
      label: () => '标准 (批处理)',
      onClick: () => {
        if (opts?.showCreatePipelineModal) {
          opts?.showCreatePipelineModal?.({ pipelineType: PipelineTypeEnum.PYTHON });
        } else {
          createPipeline({
            pipeline: {
              name: randomNameGenerator(),
            },
          });
        }
      },
      uuid: 'Pipelines/NewPipelineMenu/standard',
    },
    {
      beforeIcon: <IntegrationPipeline />,
      label: () => '数据集成',
      onClick: () => {
        if (opts?.showCreatePipelineModal) {
          opts?.showCreatePipelineModal?.({ pipelineType: PipelineTypeEnum.INTEGRATION });
        } else {
          createPipeline({
            pipeline: {
              name: randomNameGenerator(),
              type: PipelineTypeEnum.INTEGRATION,
            },
          });
        }
      },
      uuid: 'Pipelines/NewPipelineMenu/integration',
    },
    {
      beforeIcon: <StreamingPipeline size={ICON_SIZE} />,
      label: () => '流处理',
      onClick: () => {
        if (opts?.showCreatePipelineModal) {
          opts?.showCreatePipelineModal?.({ pipelineType: PipelineTypeEnum.STREAMING });
        } else {
          createPipeline({
            pipeline: {
              name: randomNameGenerator(),
              type: PipelineTypeEnum.STREAMING,
            },
          });
        }
      },
      uuid: 'Pipelines/NewPipelineMenu/streaming',
    },
  ];

  if (opts?.showBrowseTemplates) {
    arr.push({
      beforeIcon: <TemplateShapes />,
      label: () => '从模板',
      onClick: () => opts?.showBrowseTemplates?.(),
      uuid: 'Pipelines/NewPipelineMenu/custom_template',
    });
  }

  if (opts?.showImportPipelineModal) {
    arr.push({
      beforeIcon: <Upload />,
      label: () => '导入管道 zip',
      onClick: () => opts?.showImportPipelineModal?.(),
      uuid: 'Pipelines/NewPipelineMenu/upload',
    });
  }

  if (opts?.showAIModal) {
    arr.push({
      beforeIcon: <AISparkle />,
      label: () => '使用 AI (测试版)',
      onClick: () => opts?.showAIModal?.(),
      uuid: 'Pipelines/NewPipelineMenu/AI_modal',
    });
  }

  return arr;
};
