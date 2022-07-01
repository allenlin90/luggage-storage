import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Select, MenuItem, Typography } from '@mui/material';
import { branches } from 'utils';
import { selectedBranchState } from 'states';
import { useRecoilState } from 'recoil';

export interface BranchSelectProps {
  isMobile?: boolean;
}

export const BranchSelect: FC<BranchSelectProps> = ({ isMobile = true }) => {
  const { t } = useTranslation('common');
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(selectedBranchState);

  return (
    <Select
      onChange={(e) => setSelectedBranch(e.target.value as string)}
      value={selectedBranch}
      // label={<Typography>{t('sideNav.select.hint')}</Typography>}
      size='small'
      sx={{ minWidth: '10rem', ...(isMobile && { marginX: '1rem' }) }}
    >
      {branches.map(({ id }) => {
        return (
          <MenuItem key={id} value={id}>
            <Typography>{t(`branch.${id}`)}</Typography>
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default BranchSelect;