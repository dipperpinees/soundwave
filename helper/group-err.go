package helper

func GroupError(queueErr chan error, len int) error {
	var finalErr error
	for i := 0; i < len; i++ {
		err := <-queueErr
		finalErr = func(err error) error {
			if err != nil {
				return err
			}
			return finalErr
		}(err)
	}

	return finalErr
}
