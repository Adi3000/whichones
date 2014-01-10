package net.whichones.common.sheet.data;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import net.whichones.common.lines.data.Line;

import org.codehaus.jettison.json.JSONArray;
import org.hibernate.annotations.Type;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;

@Entity
@Table(name="sheets")
@SequenceGenerator(name = "sheets_sheet_id_seq", sequenceName = "sheets_sheet_id_seq", allocationSize=1)
public class Sheet extends AbstractDataObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8808349910534017872L;
	private Integer id;
	private String title;
	private String description;
	private JSONArray headers;
	private String token;
	private String password;
	private User user;
	private Set<Line> lines;
	/**
	 * @return the id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sheets_sheet_id_seq")
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
	/**
	 * @return the headers
	 */
	@Column(name="sheet_headers")
	@Type(type="com.adi3000.common.database.hibernate.usertype.JSONArrayUserType")
	public JSONArray getHeaders() {
		return headers;
	}
	/**
	 * @param headers the headers to set
	 */
	public void setHeaders(JSONArray headers) {
		this.headers = headers;
	}
	/**
	 * @return the lines
	 */
	@OneToMany
	@JoinColumn(name="sheet_id")
	public Set<Line> getLines() {
		return lines;
	}
	/**
	 * @param lines the lines to set
	 */
	public void setLines(Set<Line> lines) {
		this.lines = lines;
	}

}
