import { Fragment } from 'react';
import styled from '@emotion/styled';
import { useGauge } from 'use-gauge';
import clsx from 'clsx';

type GaugeProps = {
  frequency?: number;
  note: string;
  noteFrequency: number;
};

const GaugeContainer = styled.div`
  padding: 0.5rem;

  .svg {
    padding: 0.5rem;
    overflow: visible;

    #ticks {
    }
    #needle {
    }

    .stroke-gray-300 {
      stroke: #d1d5db;
    }
    .stroke-green-300 {
      stroke: #4ade80;
    }
    .stroke-red-400 {
      stroke: #f87171;
    }

    .fill-gray-300 {
      fill: #d1d5db;
    }

    .fill-gray-700 {
      fill: #374151;
    }

    .fill-white {
      fill: #fff;
    }

    // text
    .fill-gray-400 {
      fill: #9ca3af;
    }

    .text-sm {
      font-size: 0.875rem;
    }
  }
`;

export const Gauge = ({ frequency, noteFrequency, note }: GaugeProps) => {
  const domain: [number, number] = [noteFrequency - 20, noteFrequency + 20];
  const gauge = useGauge({
    domain,
    startAngle: 90,
    endAngle: 270,
    numTicks: 21,
    diameter: 200,
  });

  const needle = gauge.getNeedleProps({
    value: frequency || noteFrequency - 20,
    baseRadius: 6,
    tipRadius: 5,
  });

  return (
    <GaugeContainer>
      <svg className="svg" {...gauge.getSVGProps()}>
        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle);
            const showText = [90, 180, 270].includes(angle);
            return (
              <Fragment key={`tick-group-${angle}`}>
                <line
                  className={clsx([
                    'stroke-gray-300',
                    {
                      'stroke-green-300':
                        noteFrequency &&
                        asValue > noteFrequency - 3 &&
                        asValue <= noteFrequency + 3,
                      'stroke-red-400':
                        (noteFrequency && asValue <= noteFrequency - 10) ||
                        (noteFrequency && asValue >= noteFrequency + 10),
                    },
                  ])}
                  strokeWidth={15}
                  {...gauge.getTickProps({
                    angle,
                    length: 8,
                  })}
                />
                {showText && (
                  <text
                    className="text-sm fill-gray-400"
                    {...gauge.getLabelProps({ angle, offset: 30 })}
                  >
                    {asValue}Hz
                  </text>
                )}
              </Fragment>
            );
          })}
        </g>
        {frequency && frequency >= domain[0] && frequency <= domain[1] && (
          <g id="needle">
            <circle className="fill-gray-300" {...needle.base} r={12} />
            <circle className="fill-gray-700" {...needle.base} />
            <circle className="fill-gray-700" {...needle.tip} />
            <polyline className="fill-gray-700" points={needle.points} />
          </g>
        )}
      </svg>
    </GaugeContainer>
  );
};
