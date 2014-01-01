package net.whichones.common.sheet;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;

public class Sheet extends AbstractDataObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8808349910534017872L;
	private Integer id;
	private String title;
	private String description;
	private String token;
	private String password;
	private User user;
	/**
	 * @return the id
	 */
	@Id
	@Column(name="sheet_id")
	public Integer getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * @return the title
	 */
	@Column(name="sheet_title")
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @return the description
	 */
	@Column(name="sheet_description")
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * @return the token
	 */
	@Column(name="sheet_token")
	public String getToken() {
		return token;
	}
	/**
	 * @param token the token to set
	 */
	public void setToken(String token) {
		this.token = token;
	}
	/**
	 * @return the password
	 */
	@Column(name="sheet_password")
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the user
	 */
	@JoinColumn(name="user_id")
	public User getUser() {
		return user;
	}
	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}

}
