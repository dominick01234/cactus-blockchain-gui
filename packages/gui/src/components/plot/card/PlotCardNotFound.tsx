import React from 'react';
import { Trans } from '@lingui/macro';
import { FormatLargeNumber, CardSimple } from '@cactus/core';
import { useGetTotalHarvestersSummaryQuery } from '@cactus/api-react';

export default function PlotCardNotFound() {
  const { noKeyFilenames, initializedHarvesters, isLoading } = useGetTotalHarvestersSummaryQuery();

  return (
    <CardSimple
      title={<Trans>Plots With Missing Keys</Trans>}
      value={<FormatLargeNumber value={noKeyFilenames} />}
      loading={isLoading || !initializedHarvesters}
    />
  );
}
