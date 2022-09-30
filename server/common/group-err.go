package common

func GroupError(queueErr chan error, len int) error {
	var finalErr error
	for i := 0; i < len; i++ {
		err := <-queueErr
		finalErr = func() error {
			if err != nil {
				return err
			}
			return finalErr
		}()
	}

	return finalErr
}
