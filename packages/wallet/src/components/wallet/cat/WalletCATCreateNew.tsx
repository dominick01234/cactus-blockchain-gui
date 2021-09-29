import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import { AlertDialog, Amount, Fee, Back, ButtonLoading, Card, Flex, Form } from '@chia/core';
import { Box, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { create_cc_action } from '../../../modules/message';
import { chia_to_mojo } from '../../../util/chia';
import { openDialog } from '../../../modules/dialog';
import { useHistory } from 'react-router';

type CreateCATWalletData = {
  amount: string;
  fee: string;
};

export default function WalletCATCreateNew() {
  const history = useHistory();
  const methods = useForm<CreateCATWalletData>({
    shouldUnregister: false,
    defaultValues: {
      amount: '',
      fee: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  async function handleSubmit(values: CreateCATWalletData) {
    try {
      const { amount, fee } = values;
      setLoading(true);

      if (!amount ||
        Number(amount) === 0 ||
        !Number(amount) ||
        isNaN(Number(amount))
      ) {
        dispatch(
          openDialog(
            <AlertDialog>
              <Trans>Please enter a valid numeric amount</Trans>
            </AlertDialog>,
          ),
        );
        return;
      }
      if (fee === '' || isNaN(Number(fee))) {
        dispatch(
          openDialog(
            <AlertDialog>
              <Trans>Please enter a valid numeric fee</Trans>
            </AlertDialog>,
          ),
        );
        return;
      }

      const amountMojos = chia_to_mojo(amount);
      const feeMojos = chia_to_mojo(fee);

      const response = await dispatch(create_cc_action(amountMojos, feeMojos));
      if (response && response.data && response.data.success === true) {
        history.push(`/dashboard/wallets/${response.data.wallet_id}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <Flex flexDirection="column" gap={3}>
        <Back variant="h5">
          <Trans>Create New Chia Asset Token Wallet</Trans>
        </Back>
        <Card>
          <Grid spacing={2} container>
            <Grid xs={12} md={6} item>
              <Amount
                name="amount"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <Fee
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Card>
        <Box>
          <ButtonLoading
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
          >
            <Trans>Create</Trans>
          </ButtonLoading>
        </Box>
      </Flex>
    </Form>
  );
}
