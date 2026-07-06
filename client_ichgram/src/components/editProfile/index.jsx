import { Avatar, Card, Flex, Input, Typography, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../../components/button";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { updateProfile } from "../../redux/slices/userSlice.js";
import imgLink from "../../assets/icons/imgLink.png";

function EditProfile({ setEditProfile }) {
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

  const onSubmit = async (data) => {
    await dispatch(updateProfile(data));
    reset();
    setEditProfile(false);
  };

  return (
    <div className={styles.editProfContaiiner}>
      <h2>Edit profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={styles.card}>
          <Flex style={{ gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
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
              <h4 className={styles.bioCard}>{me.bio}</h4>
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
                  rules={
                    elem.name === "username"
                      ? {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters",
                          },
                          validate: (value) =>
                            value.trim() !== "" || "Username cannot be empty",
                        }
                      : elem.name === "website"
                        ? {
                            validate: (value) => {
                              if (!value) return true;

                              try {
                                new URL(
                                  value.startsWith("http")
                                    ? value
                                    : `https://${value}`,
                                );
                                return true;
                              } catch {
                                return "Enter a valid URL";
                              }
                            },
                          }
                        : {}
                  }
                  render={({ field }) =>
                    elem.name === "bio" ? (
                      <Input.TextArea
                        rows={4}
                        {...field}
                        maxLength={150}
                        style={{ fontWeight: "600" }}
                      />
                    ) : (
                      <Input
                        className={styles.inputProfile}
                        {...field}
                        prefix={
                          elem.name === "website" ? (
                            <img
                              src={imgLink}
                              alt="link"
                              width={10}
                              height={10}
                            />
                          ) : null
                        }
                        style={
                          elem.name === "website"
                            ? { color: "rgba(0, 55, 107, 1)" }
                            : {}
                        }
                      />
                    )
                  }
                />
                {errors[elem.name] && (
                  <Typography.Text type="danger">
                    {errors[elem.name].message}
                  </Typography.Text>
                )}
              </div>
            );
          })}
        </div>
        <Btn htmlType={"submit"} titleBtn={"Save"} widthBtn={"19vw"} />
      </form>
    </div>
  );
}

export default EditProfile;
