import React, { useEffect } from 'react'
import Meta from '@/components/layout/Meta'
import Loader from '@/components/layout/Loader'
import useUsers from '@/hooks/user/useUsers'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error'
import AdminProtected from '@/components/admin/AdminProtected'
import UserList from '@/components/users/UserList'

const AllUsers = () => {
  const router = useRouter()
  const id = router.query['id'] as string
  const { users, loading, error, count } = useUsers()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      closeSnackbar()
      router.push('/')
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  }, [router, id, error, closeSnackbar, enqueueSnackbar])

  if (loading) return <Loader />

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="All Users" />
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        All Users ({count ? count : 0})
      </Typography>
      {!users || users.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no users to display</Typography>
        :
        <UserList users={users} />
      }
    </Container>
  )
}

export default AdminProtected(AllUsers)
