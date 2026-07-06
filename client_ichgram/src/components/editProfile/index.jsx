import { Avatar, Card, Flex, Input, Typography, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../../components/button";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { updateProfile } from "../../redux/slices/userSlice.js";

function EditProfile() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const avatar = watch("avatar");

  const arrInputs = [
    {
      name: "username",
      title: "Username",
      default: me.username,
    },
    {
      name: "website",
      title: "Website",
      default: me.website,
    },
    {
      name: "bio",
      title: "About",
      default: me.bio,
    },
  ];

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
    reset();
  };

  return (
    <div className={styles.editProfContaiiner}>
      <h2>Edit profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={styles.card}>
          <Flex style={{ gap: "16px", alignItems: "center" }}>
            <Avatar
              style={{ height: "56px", width: "56px" }}
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : me.avatar
                    ? `http://127.0.0.1:3333/uploads/${me.avatar}`
                    : undefined
              }
            />

            <div>
              <h3>{me.username}</h3>
              <h4>{me.bio}</h4>
            </div>

            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <Upload
                  className={styles.upload}
                  beforeUpload={() => false}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                  fileList={
                    field.value
                      ? [
                          {
                            uid: "1",
                            name: field.value.name,
                            status: "done",
                            originFileObj: field.value,
                          },
                        ]
                      : []
                  }
                  onChange={(info) => {
                    field.onChange(info.fileList[0]?.originFileObj || null);
                  }}
                >
                  <Btn widthBtn="114px" titleBtn="New photo" />
                </Upload>
              )}
            />
          </Flex>
        </Card>

        <div className={styles.inputsContainer}>
          {arrInputs.map((elem) => {
            return (
              <div key={elem.name}>
                <Typography.Title level={4}>{elem.title}</Typography.Title>
                <Controller
                  name={elem.name}
                  control={control}
                  defaultValue={elem.default}
                  render={({ field }) =>
                    elem.name === "bio" ? (
                      <Input.TextArea rows={4} {...field} maxLength={150} />
                    ) : (
                      <Input {...field} />
                    )
                  }
                />
              </div>
            );
          })}
        </div>
        <Btn htmlType={"submit"} titleBtn={"Save"}/>
      </form>
    </div>
  );
}

export default EditProfile;
